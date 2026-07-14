import { DimensionOcrService } from '../application/use-cases/dimension-ocr.service';
export declare class DimensionOcrController {
    private readonly ocrService;
    constructor(ocrService: DimensionOcrService);
    extractDimensions(file: Express.Multer.File): Promise<{
        largeur: number | null;
        longueur: number | null;
        epaisseur: number | null;
        rawText: string;
    } | {
        error: string;
    }>;
}
