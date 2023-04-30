import type {File} from '@/stores/file'
import { transform} from 'sucrase'
import { parse, compileScript, rewriteDefault, compileTemplate} from 'vue/compiler-sfc'
export const COMP_IDENTIFIER = `__sfc__`
import { cloneDeep } from 'lodash'
import { parseTemplate, transformTemplate, generateTemplate } from  './transformTemplate'
import type {
  SFCDescriptor,
  BindingMetadata,
  // shouldTransformRef,
  // transformRef,
  CompilerOptions
} from 'vue/compiler-sfc'
async function transformTS(src: string) {
  return transform(src, {
    transforms: ['typescript']
  }).code
}
export async function compileFile(
  { filename, code, compiled }: File
) {
  if (!code.trim()) {
    // errors = []
    return
  }

  if (filename.endsWith('.js') || filename.endsWith('.ts')) {
    if (filename!.endsWith('.ts')) {
      code = await transformTS(code!)
    }
    compiled.js = compiled.ssr = code
    return
  }

  if (!filename!.endsWith('.vue')) {
    return
  }
  const { errors, descriptor } = parse(code, {
    filename,
    sourceMap: true
  })
  if (errors.length) {
    console.log(errors)
    return
  }

  let clientCode = ''
  const scriptLang =
    (descriptor.script && descriptor.script.lang) ||
    (descriptor.scriptSetup && descriptor.scriptSetup.lang)
  const isTS = scriptLang === 'ts'

  const clientScriptResult = await doCompileScript(descriptor, '123', false,isTS )
  
  if (!clientScriptResult) {
    return
  }
  const [clientScript, bindings] = clientScriptResult
  clientCode += clientScript

  doCompileSelf(descriptor,compiled)

    // template
  // only need dedicated compilation if not using <script setup>
  if (
    descriptor.template &&
    (!descriptor.scriptSetup)
  ) {

    

    const clientTemplateResult = await doCompileTemplate(
      descriptor,
      '123',
      bindings,
      false,
      isTS
    )
    if (!clientTemplateResult) {
      return
    }
    clientCode += clientTemplateResult
  }
  if (clientCode ) {
    clientCode +=

      `\n${COMP_IDENTIFIER}.__file = ${JSON.stringify(filename)}` +
        `\nexport default ${COMP_IDENTIFIER}`
    compiled.js = clientCode.trimStart()
  }

}

async function doCompileScript(
  descriptor: SFCDescriptor,
  id: string,
  ssr: boolean,
  isTS: boolean
): Promise<[string, BindingMetadata | undefined] | undefined> {
  if (descriptor.script || descriptor.scriptSetup) {
    try {
      const expressionPlugins: CompilerOptions['expressionPlugins'] = isTS
        ? ['typescript']
        : undefined
      const compiledScript = compileScript(descriptor, {
        inlineTemplate: true,
        id,
        templateOptions: {
          ssr,
          ssrCssVars: descriptor.cssVars,
          compilerOptions: {
            expressionPlugins
          }
        }
      })
      let code = ''
      if (compiledScript.bindings) {
        code += `\n/* Analyzed bindings: ${JSON.stringify(
          compiledScript.bindings,
          null,
          2
        )} */`
      }
      code +=
        `\n` +
        rewriteDefault(
          compiledScript.content,
          COMP_IDENTIFIER,
          expressionPlugins
        )

      if ((descriptor.script || descriptor.scriptSetup)!.lang === 'ts') {
        code = await transformTS(code)
      }

      return [code, compiledScript.bindings]
    } catch (e: any) {
      return
    }
  } else {
    return [`\nconst ${COMP_IDENTIFIER} = {}`, undefined]
  }
}


function doCompileSelf( 
  descriptor: SFCDescriptor,
  compiled: any,
) {
  const parsed = parseTemplate(descriptor.template!.content)
  compiled.parsed = cloneDeep(parsed)

  const transformed = transformTemplate(parsed)
  compiled.transformed = transformed
  const generateTemplater = generateTemplate(transformed)
  
  const fnName =`render`

  const code =
    `\n${generateTemplater.code.replace(
      /\nexport (function|const) (render|ssrRender)/,
      `$1 ${fnName}`
    )}` + `\n__sfc__.${fnName} = ${fnName}`

  compiled.parsedCode = code
}

async function doCompileTemplate(
  descriptor: SFCDescriptor,
  id: string,
  bindingMetadata: BindingMetadata | undefined,
  ssr: boolean,
  isTS: boolean
) {

  
  const templateResult = compileTemplate({
    source: descriptor.template!.content,
    filename: descriptor.filename,
    id,
    scoped: descriptor.styles.some((s) => s.scoped),
    slotted: descriptor.slotted,
    ssr,
    ssrCssVars: descriptor.cssVars,
    isProd: false,
    compilerOptions: {
      bindingMetadata,
      expressionPlugins: isTS ? ['typescript'] : undefined
    }
  })
  if (templateResult.errors.length) {
    return
  }

  const fnName = ssr ? `ssrRender` : `render`

  let code =
    `\n${templateResult.code.replace(
      /\nexport (function|const) (render|ssrRender)/,
      `$1 ${fnName}`
    )}` + `\n${COMP_IDENTIFIER}.${fnName} = ${fnName}`

  if ((descriptor.script || descriptor.scriptSetup)?.lang === 'ts') {
    code = await transformTS(code)
  }

  return code
}
