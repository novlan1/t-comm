export type ProvTypeChild = {
  text: String
  code: String | Number
}

export type ProvType = {
  text: String
  code: String | Number
  children?: Array<ProvTypeChild>
}
