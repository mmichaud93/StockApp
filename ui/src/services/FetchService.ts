import mergeOptions from "merge-options";

async function get<T>(path: string, options?: any): Promise<T> {
  return (
    await fetch(
      path,
      mergeOptions(
        {
          method: "get",
          crossDomain: true,
        },
        options,
      ),
    )
  ).json();
}

export { get };
