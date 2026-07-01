import { Injectable } from '@nestjs/common';
import Tesseract from 'tesseract.js';

@Injectable()
export class DimensionOcrService {
  async extractDimensions(imageBuffer: Buffer): Promise<{
    largeur: number | null;
    longueur: number | null;
    epaisseur: number | null;
    rawText: string;
  }> {
    // ── Étape 1 : OCR lit tout le texte de l'image ──
    const { data: { text } } = await Tesseract.recognize(
      imageBuffer,
      'fra', // langue française
      { logger: () => {} }, // désactive les logs verbeux
    );

    // ── Étape 2 : Regex pour extraire les nombres associés aux mots-clés ──
    const largeur   = this._extractNumber(text, ['largeur', 'width']);
    const longueur  = this._extractNumber(text, ['longueur', 'length']);
    const epaisseur = this._extractNumber(text, ['épaisseur', 'epaisseur', 'thickness']);

    return { largeur, longueur, epaisseur, rawText: text };
  }

  // ── Cherche un nombre proche d'un mot-clé ──
  private _extractNumber(text: string, keywords: string[]): number | null {
    const lowerText = text.toLowerCase();

    for (const keyword of keywords) {
      // Cherche "largeur : 100 cm" ou "largeur 100cm"
      const regex = new RegExp(`${keyword}[^0-9]*(\\d+[.,]?\\d*)`, 'i');
      const match = lowerText.match(regex);
      if (match) {
        return parseFloat(match[1].replace(',', '.'));
      }
    }
    return null;
  }
}