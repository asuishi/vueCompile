import { NodeTypes, ElementTypes} from '@/types/nodeTyoes'

const filterArray = ["loc", "ns"]
export function replacer(key: string, value: any) {
  // Filtering out properties
  if (filterArray.includes(key)) {
    return undefined;
  }
  if (key === "type") {
    return `${value}(${NodeTypes[value]})`
  }
  if (key === "tagType") {
    return `${value}(${ElementTypes[value]})`
  }
  return value;
}