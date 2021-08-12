interface AggregateObjectProps {
  [index: string]: any;
}

export abstract class AggregateRoot<T extends AggregateObjectProps> {
  public props: T;
  protected readonly _id: number;

  protected constructor(props: T, id: number) {
    this.props = { ...props };
    this._id = id;
  }

  get id(): number {
    return this._id;
  }
}
