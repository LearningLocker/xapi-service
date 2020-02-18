import ActivityInteractionComponent from './ActivityInteractionComponent';
import ActivityInteractionType from './ActivityInteractionType';
import Definition from './Definition';

interface InteractionActivityDefinition extends Definition {
  readonly interactionType: ActivityInteractionType;
  readonly correctResponsesPattern?: string[];

  /** In case of `interactionType` equals to "choice" or "sequencing" */
  readonly choices?: ActivityInteractionComponent[];

  /** In case of `interactionType` equals to "likert" */
  readonly scale?: ActivityInteractionComponent[];

  /** In case of `interactionType` equals to "matching" */
  readonly source?: ActivityInteractionComponent[];

  /** In case of `interactionType` equals to "matching" */
  readonly target?: ActivityInteractionComponent[];

  /** In case of `interactionType` equals to "performance" */
  readonly steps?: ActivityInteractionComponent[];
}

export default InteractionActivityDefinition;
