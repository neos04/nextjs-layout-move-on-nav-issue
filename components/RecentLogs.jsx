import { useState, useEffect } from "react"


const RecentLogs = () => {
  const [recentLogs, setRecentLogs] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      // setIsLoading(true);
      // setError(null);

      try {
        const records = await pb.collection('Logs').getlList(1, 20);
        console.log(records)
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();


  }, [])



  return (
    <div>RecentLogs</div>
  )
}

export default RecentLogs