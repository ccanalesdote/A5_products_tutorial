export interface FileUpload {
    id?: string,
    name: string,
    description?: string,
    size: number,
    date_last?: Date,
    url: string,
    type: string
}