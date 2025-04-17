 interface fileInterface{
    title:string,
    description?:string,
    file64?:string,
    filename?:string,
    canUpdate:boolean,
    required:boolean,
    isSetted:boolean,
    oldValues:any[]
}
 interface inputInterface{
    key?:any,
    name:string,
    type:string,
    label?:string,
    labels?:any[],
    value:any,
    model:boolean,
    helper_text:string,
    canUpdate:boolean,
    required:boolean,
    oldValues:any[]
}

export interface stepInterface{
    name:string,
    is_active:boolean,
    description?:string,
    inputs?:inputInterface[]
    files?:fileInterface[],
    contracts?:any[]
}