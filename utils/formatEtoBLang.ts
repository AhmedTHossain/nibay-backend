export const formatEnglishToBangalNum = (
  n: any,
  language: string = "bangla"
) =>
  language == "english" ? n : n?.replace(/\d/g, (d: any) => "০১২৩৪৫৬৭৮৯"[d]);
