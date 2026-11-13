export interface ITodo {
    id ?: string;
    title : string;
    description ?: string;
    done : boolean;
    createdAt ?: any; // Timestamp de Firestore
}
