import { h } from 'preact';
import { Link } from 'preact-router';
import { Button } from 'preact-mdl';

const socialLinks = [
  { name: 'Github', profile: 'https://github.com/ooade', color: '#424242' },
  { name: 'Twitter', profile: 'https://twitter.com/_ooade', color: '#03A9F4' }
];

export default() => {
  return (
    <div style={{ padding: 100 }}>
      <Link href='/'>
        <Button colored raised style={{ marginBottom: 20 }}> Go Back </Button>
      </Link>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div style={{ padding: 50 }}>
        <p> Really wanna know about me ??? 🙊🙊 Check me out on: </p>
        {
          socialLinks.map(s =>
            <a href={s.profile}>
              <Button colored raised style={{ backgroundColor: s.color }}>
                 {s.name}
              </Button> {" "}
            </a>
          )
        }
      </div>
    </div>
  );
};
