const errorHandler = (setConfirmTitle, error) => {
    if (error?.graphQLErrors?.length > 0) {
        setConfirmTitle(`Virhe: ${error.graphQLErrors[0].message}`)
    } else if (error?.message) {
        setConfirmTitle(`Virhe: ${error.message}`)
    } else {
        setConfirmTitle(`Virhe: ${error}`)
    }
}

export default errorHandler