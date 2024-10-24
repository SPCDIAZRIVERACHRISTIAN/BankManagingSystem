/**
 * add loan card page
 *
 * displays the form of loans displayed by addloan component.
 */
import AddLoan from '../components/AddLoan';
import NavBar from '../components/NavBar';

const AddLoanPage = () => {
    return (
        <div>
            <NavBar />
            <AddLoan />
        </div>
    );
};

export default AddLoanPage;
