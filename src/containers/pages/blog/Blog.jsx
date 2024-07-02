import Layout from "hocs/layout/Layout";
import { connect } from "react-redux";

function Blog () {
    return (
        <Layout>
            Blog
        </Layout>
    )
}


const mapStateToProps = state => ({
        
    });

export default connect (mapStateToProps,{

}) (Blog);