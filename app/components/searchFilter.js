var React = require("react");
module.exports = React.createClass({
	render: function(){
		return (
				<input type="text" ref="searchString" onChange={this.filter}/>
			);
	},
	filter: function(){
		this.props.filterData(this.refs.searchString.value);
	}
});