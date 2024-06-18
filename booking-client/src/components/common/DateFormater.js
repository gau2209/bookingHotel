const DateFormatter = ({ date }) => {
    // Định dạng ngày tháng năm theo định dạng mong muốn
    const formattedDate = new Date(date).toLocaleDateString('vi', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    return <span>{formattedDate}</span>;
  };

  export default DateFormatter