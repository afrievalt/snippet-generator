const writeToClipboard = async (result: string) => {
    const type = "text/plain";
    const blob = new Blob([result], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);        
  };

  export {writeToClipboard}