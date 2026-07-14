export declare class DimensionOcrService {
    extractDimensions(imageBuffer: Buffer): Promise<{
        largeur: number | null;
        longueur: number | null;
        epaisseur: number | null;
        rawText: string;
    }>;
    private _extractNumber;
}
