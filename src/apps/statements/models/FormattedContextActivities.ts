interface FormattedContextActivities<ActivityFormat> {
  readonly parent?: ActivityFormat[];
  readonly grouping?: ActivityFormat[];
  readonly category?: ActivityFormat[];
  readonly other?: ActivityFormat[];
}

export default FormattedContextActivities;
