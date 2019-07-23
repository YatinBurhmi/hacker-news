function getSource(link) {
  if (link !== undefined) {
    let sourceLink = new URL(link);
    let source = sourceLink.host;
    return source;
  }
  return undefined;
}

export default getSource;
