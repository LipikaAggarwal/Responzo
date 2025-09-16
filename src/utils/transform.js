function transformToResponsive(code) {
  // Basic example: replace fixed width/height with Tailwind responsive classes
  let responsive = code
    .replace(/w-(\d+)/g, "w-full sm:w-$1 md:w-$1 lg:w-$1 xl:w-$1")
    .replace(/h-(\d+)/g, "h-auto sm:h-$1 md:h-$1 lg:h-$1 xl:h-$1");
  // Add more parsing logic as needed

  const explanation =
    "Fixed width and height classes were replaced with Tailwind's responsive utilities (sm:, md:, lg:, xl:) for better adaptability across screen sizes.";

  return { responsive, explanation };
}

export { transformToResponsive };