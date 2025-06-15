export interface ExamenAplicado {
    id?: number;
    usuario_id?: number;
    pregunta_id?: number;
    palabra_id_respuesta: number;
    es_correcta: boolean;
}