import Layout from "hocs/layout/Layout";
import { connect } from "react-redux";

function Home () {
    return (
        <Layout>
            Home
        </Layout>
    )
}


const mapStateToProps = state => ({
        
    });

export default connect (mapStateToProps,{

}) (Home);