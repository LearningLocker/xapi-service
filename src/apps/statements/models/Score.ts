interface Score {
  /** Decimal number between -1 and 1, inclusive */
  readonly scaled: number;

  /** Decimal number between min and max (if present, otherwise unrestricted), inclusive */
  readonly raw?: number;

  /** Decimal number less than max (if present) */
  readonly min?: number;

  /** Decimal number greater than min (if present) */
  readonly max?: number;
}

export default Score;
