export const formatDate = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    return new Date(timestamp).toLocaleString(undefined, options);
  };