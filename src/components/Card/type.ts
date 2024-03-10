interface ICard {
    /* interface of Card, using for read DB*/
    id: string,
    code: string,
    name: string,
    type: string,
    description: string,
    isFavorite: boolean,
    counter: number,
    dateCreated: Date,
    dateUpdated: Date, 
    dateLastSeen: Date,
}