import { h } from 'preact';
import { Button } from 'preact-mdl';
import { Link } from 'preact-router';
import Todo from './Todo';

export default () => {
  return (
    <div>
      <Todo />
      <footer>
        <Link href='/about'>
          <Button colored raised style={{ backgroundColor: '#111' }}> About me </Button>
        </Link>
      </footer>
    </div>
  );
};
