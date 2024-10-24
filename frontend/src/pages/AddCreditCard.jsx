/**
 * addcredt card page
 *
 * displays the form of credit cards given by the addcredit component.
 */
import AddCredit from '../components/AddCredit';
import NavBar from '../components/NavBar';

const AddCreditCardPage = () => {
    return (
        <div>
            <NavBar />
            <AddCredit />
        </div>
    );
};

export default AddCreditCardPage;
