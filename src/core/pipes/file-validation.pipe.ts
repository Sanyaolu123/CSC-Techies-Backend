import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('No files uploaded');
    }

    this.validateFileType(value);
    this.validateFileSize(value);

    return value;
  }

  private validateFileType(files: any) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (
      files.frontImage?.[0] &&
      !allowedMimeTypes.includes(files.frontImage[0].mimetype)
    ) {
      throw new BadRequestException(
        'Front image must be a jpeg, jpg, or png file',
      );
    }

    if (
      files.backImage?.[0] &&
      !allowedMimeTypes.includes(files.backImage[0].mimetype)
    ) {
      throw new BadRequestException(
        'Back image must be a jpeg, jpg, or png file',
      );
    }
  }

  private validateFileSize(files: any) {
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (files.frontImage?.[0] && files.frontImage[0].size > maxSize) {
      throw new BadRequestException('Front image size should not exceed 5MB');
    }

    if (files.backImage?.[0] && files.backImage[0].size > maxSize) {
      throw new BadRequestException('Back image size should not exceed 5MB');
    }
  }
}
