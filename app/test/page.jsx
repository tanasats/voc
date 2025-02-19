import React from 'react'

function TestPage() {
    return (
        <div className='content-wrapper'>
            <h2 className="text-2xl">ทดสอบ Embeded Google form</h2>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScAKJPVsuSnSpMYicqXjilUwuiiRoEXrjrUN7YLlqQVHVWu-g/viewform?embedded=true"
                width="100%"
                height="731"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
            >Loading…</iframe>

        </div>
    )
}

export default TestPage
