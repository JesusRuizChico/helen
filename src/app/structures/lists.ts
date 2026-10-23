export interface IList {
    id ?: string;
    title : string;
    createdAt ?: any; // Timestamp de Firestore
    name ?: string;   // listas viejas que se guardaron con "name" en lugar de "title"
}
