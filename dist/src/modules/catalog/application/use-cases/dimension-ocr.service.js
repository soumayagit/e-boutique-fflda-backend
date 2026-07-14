"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionOcrService = void 0;
const common_1 = require("@nestjs/common");
const tesseract_js_1 = __importDefault(require("tesseract.js"));
let DimensionOcrService = class DimensionOcrService {
    async extractDimensions(imageBuffer) {
        const { data: { text } } = await tesseract_js_1.default.recognize(imageBuffer, 'fra', { logger: () => { } });
        const largeur = this._extractNumber(text, ['largeur', 'width']);
        const longueur = this._extractNumber(text, ['longueur', 'length']);
        const epaisseur = this._extractNumber(text, ['épaisseur', 'epaisseur', 'thickness']);
        return { largeur, longueur, epaisseur, rawText: text };
    }
    _extractNumber(text, keywords) {
        const lowerText = text.toLowerCase();
        for (const keyword of keywords) {
            const regex = new RegExp(`${keyword}[^0-9]*(\\d+[.,]?\\d*)`, 'i');
            const match = lowerText.match(regex);
            if (match) {
                return parseFloat(match[1].replace(',', '.'));
            }
        }
        return null;
    }
};
exports.DimensionOcrService = DimensionOcrService;
exports.DimensionOcrService = DimensionOcrService = __decorate([
    (0, common_1.Injectable)()
], DimensionOcrService);
//# sourceMappingURL=dimension-ocr.service.js.map