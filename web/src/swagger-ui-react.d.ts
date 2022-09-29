declare module 'swagger-ui-react' {
  interface SwaggerUIOptions {
    url: string
    requestInterceptor: (req: any) => any
  }
  declare class SwaggerUI extends React.Component<SwaggerUIOptions> {}
  export default SwaggerUI
}
