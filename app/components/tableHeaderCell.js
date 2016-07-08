var React = require("react");

module.exports = React.createClass({
	render : function(){
		return (
				<td><a href="#" ref="sortField" onClick={this.sort}>{this.props.val}</a></td>
			)
	},
	sort: function(field) {
		this.props.sortData(this.refs.sortField.innerText);
	}
});