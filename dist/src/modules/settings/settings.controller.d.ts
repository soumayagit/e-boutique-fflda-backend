import { SettingsService } from './settings.service';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<{
        id: string;
        heroVideoUrl: string | null;
        updatedAt: Date;
    }>;
    uploadHeroVideo(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
