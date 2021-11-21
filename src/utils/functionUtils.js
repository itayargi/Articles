// GET DIRECTION ACCORDING DEVICE'S LANGUAGE
export const findDirectionToLanguage = (lang) => {
    if (lang == 'he' || lang == 'ar') {
      return { flexDirection: 'row-reverse', align: 'right', alignSelf: 'flex-end',};
    } else
      return {flexDirection: 'row', align: 'left', alignSelf: 'flex-start', };
  };

 


