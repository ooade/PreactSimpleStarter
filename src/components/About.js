import { h } from 'preact';
import { Link } from 'preact-router';
import { Button } from 'preact-mdl';

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
        <a href='https://github.com/ooade'>
          <Button colored raised style={{ backgroundColor: '#424242' }}>
             Github
          </Button>
        </a>
        {' '}
        <a href='https://twitter.com/_ooade'>
          <Button colored raised style={{ backgroundColor: '#03A9F4' }}>
             Twitter
          </Button>
        </a>
      </div>
    </div>
  );
};
