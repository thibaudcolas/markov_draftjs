// content-types.d.ts

export interface InlineStyleRange {
  length: number;
  offset: number;
  style: string;
}

export interface EntityRange {
  length: number;
  key: number;
  offset: number;
}

export interface Entity {
  type: string;
  mutability: string;
  data: { [key: string]: any };
}

export interface DraftBlock {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: InlineStyleRange[];
  entityRanges: EntityRange[];
  data: { [key: string]: any };
}

export interface DraftContentState {
  entityMap: { [key: string]: Entity };
  blocks: DraftBlock[];
}

declare const content: DraftContentState[];
export = content;
