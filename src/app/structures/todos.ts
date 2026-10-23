export interface ITodo {
    id ?: string;
    title : string;
    done : boolean;
    createdAt ?: any; // Timestamp de Firestore
}
