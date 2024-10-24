/**
 * add deddit card page
 *
 * displays the form of debit cards given by the adddebit component.
 */
import AddDebit from '../components/AddDebit';
import NavBar from '../components/NavBar';

const AddDebitCardPage = () => {
    return (
        <div>
            <NavBar />
            <AddDebit />
        </div>
    );
};

export default AddDebitCardPage;
