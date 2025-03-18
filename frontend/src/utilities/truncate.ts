
export const truncateDescription = (text: string | null | undefined, limit: number) => {
    const safeText = text ?? "";
    const words = safeText.split(" ");

    if(words.length <= limit){
      return safeText;
    }

    return words.slice(0, limit).join(" ") + "...";
}