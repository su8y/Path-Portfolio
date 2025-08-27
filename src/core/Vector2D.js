export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  toArray() {
    return [this.x, this.y];
  }
}