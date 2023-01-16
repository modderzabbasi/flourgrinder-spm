import { ApiPropertyOptional } from '@nestjs/swagger';

export class FileDTO {
  @ApiPropertyOptional()
  fieldname?: string;

  @ApiPropertyOptional()
  originalname?: string;

  @ApiPropertyOptional()
  encoding?: string;

  @ApiPropertyOptional()
  mimetype?: string;

  @ApiPropertyOptional()
  buffer?: any;

  @ApiPropertyOptional()
  size?: number;
}

export class FileResponseDTO {
  @ApiPropertyOptional()
  ETag?: string;

  @ApiPropertyOptional()
  Location?: string;

  @ApiPropertyOptional()
  key?: string;

  @ApiPropertyOptional()
  Bucket?: string;
}
