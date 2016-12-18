import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

class PostsNew extends Component {
  // react will go all the way up the tree to find parent with router.
  // <Router> will provide the context
  static contextTypes = {
    router: PropTypes.object // gives us access to this.props.router, search up tree till u find it
  }

  onSubmit(props){
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the new
        // path to navigate to
        this.context.router.push('/');
      });
  }

  render() {
    //const handleSubmit = this.props.handleSubmit;
    //const title = this.props.fields.title
    const {fields: {title, categories, content}, handleSubmit} = this.props;

// {...title} - destructuring. every property of title object shows up in <input>
// <input type="text" className="form-control" onChange={title.onChange} etc />
// form elements are now managed by redux form
    return (
      //can optionally include an action creator. handleSubmit(action creator)
      // action creator will be called if form is submitted and valid
      //<form onSubmit={handleSubmit(this.props.createPost)}>  -replaced to use Context, go homepage

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

// if error object has key that matches a field name and key has a truthy object tied to it
// redux form will assume form is invalid

function validate(values){
  const errors = {};

  if (!values.title){
    errors.title = 'Enter a username';
  }
  if (!values.categories){
    errors.categories = 'Enter categories';
  }
  if (!values.content){
    errors.content = 'Enter some content';
  }
  return errors;
}


//configuration for redux form. "letter to reduxform"
//injects helpers into this.props

//redux form has the same behavior as {connect}
// can be used to inject action creators into component and create a container
// difference: reduxform has one additional argument (the config object)

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);

//user types something in...record it on application state
/*
state === {
  form: {
    PostsNewForm: {
      title: '....',
      categories: '....',
      content: '....'
    }
  }
}
*/
