export default function AboutPage() {
  return (
    <div className="about-container" style={{ padding: '20px' }}>
      <h2>About Our Todo App</h2>
      <p>This application helps you manage your tasks efficiently and keep track of your daily goals.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Secure authentication</li>
        <li>Add, edit, and complete tasks</li>
        <li>Filter tasks by status (URL-based routing)</li>
      </ul>

      <h3>Technologies Used</h3>
      <ul>
        <li>React</li>
        <li>React Router v7</li>
        <li>Vite</li>
      </ul>
    </div>
  );
}