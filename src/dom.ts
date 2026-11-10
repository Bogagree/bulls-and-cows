type ElOptions = {
  className?: string;
  text?: string;
  attrs?: Readonly<Record<string, string>>;
  children?: readonly Node[];
};

export function el<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  options: ElOptions = {},
): HTMLElementTagNameMap[Tag] {
  const element = document.createElement(tag);

  if (options.className !== undefined) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = options.text;
  }

  if (options.attrs !== undefined) {
    for (const [name, value] of Object.entries(options.attrs)) {
      element.setAttribute(name, value);
    }
  }

  if (options.children !== undefined) {
    element.append(...options.children);
  }

  return element;
}
