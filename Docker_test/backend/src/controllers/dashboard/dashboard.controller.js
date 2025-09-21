const getDashboardInfo = async () => {
  try {
  } catch (error) {
    console.error('대시보드 ', error.stack);
    throw new Error('Failed to get dashboard');
  }
};
