export const getProfileImage = (name: string, userImage?: string): string => {
  if (userImage && userImage.trim().length > 0) {
    return `http://localhost:3003/${userImage}`;
  }

  // Get first letter in uppercase
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  // Generate a simple image with initial using a public avatar service
  return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff&bold=true`;
};
