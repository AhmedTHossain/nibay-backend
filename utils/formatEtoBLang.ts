export const formatEnglishToBangalNum = (n: any, language: string = "bn") =>
  language == "en" ? n : n?.replace(/\d/g, (d: any) => "০১২৩৪৫৬৭৮৯"[d]);
