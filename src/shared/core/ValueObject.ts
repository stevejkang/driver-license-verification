interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  protected constructor(props: T) {
    this.props = { ...props };
  }

  public equals(valueObject?: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    if (valueObject.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}
